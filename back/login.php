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
    $email = htmlspecialchars($conn->real_escape_string($_POST['email']));
    $senha = $_POST['password'];

    // Preparar e executar a consulta SQL
    $stmt = $conn->prepare("SELECT senha FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($senhaCriptografada);
    $stmt->fetch();

    if ($senhaCriptografada && password_verify($senha, $senhaCriptografada)) {
        echo "Login realizado com sucesso!";
    } else {
        echo "Usuário ou senha incorretos.";
    }

    $stmt->close();
}

$conn->close();
?>
