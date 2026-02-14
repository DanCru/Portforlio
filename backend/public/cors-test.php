<?php
/**
 * File chẩn đoán — upload file này lên server tại cùng thư mục với index.php
 * mà dancru.cloud đang trỏ tới.
 * Truy cập: https://dancru.cloud/cors-test.php
 * 
 * Sau khi debug xong, XÓA file này!
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode([
    'status' => 'ok',
    'message' => 'File cors-test.php is reachable!',
    'server_info' => [
        'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'N/A',
        'script_filename' => $_SERVER['SCRIPT_FILENAME'] ?? 'N/A',
        'script_name' => $_SERVER['SCRIPT_NAME'] ?? 'N/A',
        'request_uri' => $_SERVER['REQUEST_URI'] ?? 'N/A',
        'php_self' => $_SERVER['PHP_SELF'] ?? 'N/A',
        'server_name' => $_SERVER['SERVER_NAME'] ?? 'N/A',
        'current_dir' => __DIR__,
        'current_file' => __FILE__,
    ],
    'laravel_check' => [
        'vendor_autoload_exists' => file_exists(__DIR__ . '/../vendor/autoload.php'),
        'bootstrap_app_exists' => file_exists(__DIR__ . '/../bootstrap/app.php'),
        'cors_middleware_exists' => file_exists(__DIR__ . '/../app/Http/Middleware/CorsMiddleware.php'),
        'env_file_exists' => file_exists(__DIR__ . '/../.env'),
    ],
    'directory_listing' => array_slice(scandir(__DIR__), 0, 30),
    'parent_directory_listing' => is_dir(__DIR__ . '/..') ? array_slice(scandir(__DIR__ . '/..'), 0, 30) : 'Cannot access parent',
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
