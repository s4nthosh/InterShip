<?php
include 'Connect.php';
session_start();

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, PUT, DELETE, GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER["REQUEST_METHOD"];

try {
    $data = json_decode(file_get_contents("php://input"), true);

    if ($method === "POST") {
        login($data);
    }
    elseif ($method === "GET") {
        getLoggedInUser();
    }
    elseif ($method === "DELETE") {
        logout();
    } 
    else {
        echo json_encode(["success" => false, "message" => "Invalid request method"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Connection Failed: " . $e->getMessage()]);
}

$conn = null;

function login($data) {
    global $conn;

    try {
        // Validate input
        if (!isset($data['password']) || !isset($data['userName'])) {
            throw new Exception("Username/userID and password are required");
        }

        $password = $data['password'];
        $usernameOrId = $data['userName'];

        // Query to check both username and userID
        $sql = "SELECT * FROM admin WHERE (username = :usernameOrId OR adminId = :usernameOrId) AND password = :password";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':usernameOrId', $usernameOrId, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);
        $stmt->execute();

        // Check if a user is found
        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode([
                "success" => true,
                "message" => "Login successful",
                "user" => [
                    "userName" => $user['username'],
                ]
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "message" => "Invalid username/userID or password"
            ]);
        }

    } catch (Exception $e) {
        echo json_encode([
            "success" => false,
            "message" => $e->getMessage()
        ]);
    }
}

function getLoggedInUser() {
    if (isset($_SESSION['user'])) {
        echo json_encode([
            "success" => true,
            "user" => $_SESSION['user']
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "No user is logged in"
        ]);
    }
}

function logout() {
    session_start();
    session_unset(); 
    session_destroy();

    echo json_encode([
        "success" => true,
        "message" => "Logout successful"
    ]);
}