---
title: Bringing Relational SQL Databases to the P2P World
slug: paraql
author: Tomas Ravinskas
published: 2026-08-22T20:45:00+0300
devto: https://dev.to/ozymandiasthegreat/bringing-relational-sql-databases-to-the-p2p-world-5hk6
---

Have you ever wanted to integrate full-text search (or to be more trendy, vector similarity search) in to your P2P project only to be disappointed by the available options (or lack there of)? I sure was, so I set out to see what could be done to improve the situation.

<!--more-->

One somewhat popular option I saw in the wild, was using SQLite to build a local index of P2P synced data and use that for searches. So I started wondering what would it take to replicate SQLite database over P2P network and make it multi-writer. It soon became clear that I'll need a custom VFS (virtual file system). And then it became clear it's not that simple.

If you simply sync results of write operations between peers it's super cheap, but supporting multiple writers becomes rather complex: conflicting writes corrupt database very quickly. You could use CRDTs or binary patching, but that gets expensive quickly and database corruption remains a risk in edge cases. Basically, SQLite was never meant to support such cases and it makes no effort to enable them.

The solution I eventually settled on is syncing raw SQL whenever a query modifies the database and using my custom VFS to persist the resulting database to a shared view that can also be synced under some conditions to speed things up. For that I used the excellent [Autobee](https://github.com/holepunchto/autobee) library from [Holepunch](https://holepunch.to/). The result?

## Introducing ParaQL

[ParaQL](https://github.com/getbullet-app/paraql) (pronounced `[paraquel]`) is kind of mad-science experiment (that I hope will grow into production ready library one day) using [libSQL](https://github.com/tursodatabase/libsql) (an open-contribution SQLite fork, with native vector support) for database operations and Autobee (automatically rebased multi-writer key-value store) for storage and sync.

It can create or load (deserialize) any SQLite database and replicate it over any stream-like transport. You get to decide who gets write access and also control what can be written to or removed from the database. You can also export (serialize) ParaQL database to standard SQLite format. All standard SQL operations work, and most features specific to SQLite should work as well (plus vector similarity search!), though don't expect things like `PRAGMA` to work, at least not correctly. Other things include encrypting the database, both on disk and in transport, and deflate based compression to reduce disk space requirements at the cost of performance (more on that later).

It works by appending (logging) SQL queries that modify the database to Autobee writer's oplog and then applying the result of executing those queries to an Autobee view. This makes data base corruption extremely unlikely, since from the point of SQLite it's operating in a single writer environment. This also means that peers that are behind on updates don't necessarily have to execute the SQL every time - if conditions are met, we can just "fast-forward" to the latest view (the database). Temporary files are never synced - they're written locally only to a RocksDB based storage.

One thing that wasn't immediately obvious with this design is the disk space requirements. RocksDB does not remove deleted data from disk until `compact()` is called, and since both Autobee and temporary storage use RocksDB under the hood, the storage requirements grow with every operation. The way SQLite works is writing data in pages (4096KiB by default) and moving data around to keep the database file small, which result in a lot of writes, even for small modifications. Because SQLite and RocksDB approaches are somewhat incompatible, writing 1MiB of data to the database can require up to 200MiB storage space depending on how that data was written. Fortunately the vast majority of this overhead can be reclaimed by ParaQL's `compact()` method. Still this only became apparent during benchmarking, so regular usage should use much less disk space, even with larger payloads. Compacting the database periodically is nevertheless a good idea.

ParaQL's approach is rather similar to keeping a local SQLite database, but more automated, and potentially more performant if conditions are favorable. It's yet to be tested in a real-world scenario, but I have high hopes for it. If you try it out or even use it for a project, do let me know on [Github](https://github.com/getbullet-app/paraql/issues).
