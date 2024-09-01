<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "usuarios";

// Conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Escapar e validar entradas
    $nome = htmlspecialchars($conn->real_escape_string($_POST['name']));
    $telefone = htmlspecialchars($conn->real_escape_string($_POST['telefone']));
    $email = htmlspecialchars($conn->real_escape_string($_POST['email']));
    $senha = $_POST['password'];

    // Criptografar a senha
    $senhaCriptografada = password_hash($senha, PASSWORD_BCRYPT);

    // Preparar e executar a consulta SQL
    $stmt = $conn->prepare("INSERT INTO usuarios (nome, telefone, email, senha) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nome, $telefone, $email, $senhaCriptografada);

    if ($stmt->execute()) {
        echo "Registro criado com sucesso!";
    } else {
        echo "Erro: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
