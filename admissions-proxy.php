<?php
// Prevent direct access
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

// Get JSON input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Target API URL
$apiUrl = 'https://futureassist.hashfuture.school/api/admissions/demo';

// Initialize cURL
$ch = curl_init($apiUrl);

// Configure cURL
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Accept: application/json',
    // meaningful user agent can help avoid blocking
    'User-Agent: HashFutureSchool-Website/1.0' 
]);

// Execute request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Check for cURL errors
if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'Proxy Error: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Forward the API response status code and body
http_response_code($httpCode);
header('Content-Type: application/json');
echo $response;
?>
