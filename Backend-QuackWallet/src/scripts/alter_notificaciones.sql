ALTER TABLE Notificaciones ADD COLUMN ID_Usuario INT NOT NULL,
ADD FOREIGN KEY (ID_Usuario) REFERENCES Usuarios(ID_Usuarios);
