USE [Pulse];
GO

set identity_insert [User] on
insert into [User] ([Id], [Username], [Email], [FirebaseId], ProfilepicUrl) VALUES
(1, 'DallenLarson', 'dallenlarson@gmail.com', '0IgY8lxGLfNVUI6SvBXpLTOAwZQ2', 'https://robohash.org/$DallenLarson?set=set5&bgset=bg1'),
(2, 'ThunderGoober', 'thunder@goober.com', '86lfkvWoWuMrJ0powhj4OuuyLG42', 'https://robohash.org/$ThunderGoober?set=set5&bgset=bg1'),
(3, 'Ness', 'nessfromearthbound@gmail.com', 'A2vqBrnr5aZP70IPxmUraTR6uZH2', 'https://robohash.org/$Ness?set=set5&bgset=bg1')
set identity_insert [User] off

set identity_insert [Reaction] on
insert into [Reaction] ([Id], [Name], [IconLink]) VALUES
(1, 'Like', 'https://cdn-icons-png.flaticon.com/512/81/81250.png'),
(2, 'Hate', 'https://static-00.iconduck.com/assets.00/hate-icon-2048x2048-zd4c5cra.png')
set identity_insert [Reaction] off

set identity_insert [Tag] on
insert into [Tag] ([Id], [Name]) VALUES
(1, 'Country'),
(2, 'Hip-Hop')
set identity_insert [Tag] off