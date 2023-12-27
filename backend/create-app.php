<?php
// Include configuration file
require_once 'config.php';
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
// Get data from the POST request
$data = json_decode(file_get_contents("php://input"));

$selectedHour = $data->selectedHour;
$selectedEmployee = $data->selectedEmployee;
$selectedOption = $data->selectedOption;

$sql = "INSERT INTO appointments (hour, employee, appointment_option, date_option) VALUES (?, ?, ?, CURDATE());";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Error in SQL query preparation: " . $conn->error);
}

// Bind the parameters and execute the query
$stmt->bind_param("sss", $selectedHour, $selectedEmployee, $selectedOption);

if ($stmt->execute()) {
    $response = ["message" => "Data inserted successfully"];
} else {
    $response = ["error" => "Error: " . $sql . "<br>" . $conn->error];
}

// Close the statement and the database connection
$stmt->close();
$conn->close();

// Return a JSON response to the React application
echo json_encode($response);
?>
