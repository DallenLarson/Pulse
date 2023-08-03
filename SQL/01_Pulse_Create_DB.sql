USE [master]
GO

IF db_id('Pulse') IS NOT NULL
BEGIN
  ALTER DATABASE [Pulse] SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
  DROP DATABASE [Pulse]
END
GO

CREATE DATABASE [Pulse]
GO

USE [Pulse]
GO
CREATE TABLE [Relationship] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FollowerId] int NOT NULL,
  [FollowedId] int NOT NULL
)
GO

CREATE TABLE [User] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Username] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseId] nvarchar(255) NOT NULL,
  [ProfilepicUrl] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Pulse] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Content] text,
  [UserId] int NOT NULL,
  [PostedAt] timestamp NOT NULL
)
GO

CREATE TABLE [Reaction] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [IconLink] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Tag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [PulseTag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [PulseId] int NOT NULL,
  [TagId] int NOT NULL
)
GO

CREATE TABLE [PulseReaction] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [PulseId] int NOT NULL,
  [UserId] int NOT NULL,
  [ReactionId] int NOT NULL
)
GO

ALTER TABLE [Pulse] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [Relationship] ADD FOREIGN KEY ([FollowedId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Reaction] ADD FOREIGN KEY ([Id]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Relationship] ADD FOREIGN KEY ([FollowerId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [PulseReaction] ADD FOREIGN KEY ([ReactionId]) REFERENCES [Reaction] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [PulseReaction] ADD FOREIGN KEY ([PulseId]) REFERENCES [Pulse] ([Id])
GO

ALTER TABLE [PulseTag] ADD FOREIGN KEY ([PulseId]) REFERENCES [Pulse] ([Id])
GO

ALTER TABLE [PulseTag] ADD FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id])
GO
