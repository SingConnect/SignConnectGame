<?php
session_start();

// Destruir a sessão
session_destroy();

// Redirecionar o usuário para a página de login (ou outra página)
header('Location: ../../vewer/init.html'); // Substitua pelo caminho correto da página de login
exit;
