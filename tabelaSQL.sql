CREATE TABLE usuarios(
	nome VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    nickname VARCHAR(50) PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    pass VARCHAR(50) NOT NULL,
    scorefacil INT NOT NULL,
    scoremedio INT NOT NULL,
    scoredificil INT NOT NULL
);