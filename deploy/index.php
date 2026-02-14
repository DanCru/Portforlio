<?php
/**
 * Server index.php cho BKHost (flat deployment tại public_html/)
 * Upload file này vào: public_html/index.php (thay thế file hiện tại)
 */

use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Determine if the application is in maintenance mode...
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

// NOTE: Flat deployment - vendor và bootstrap nằm cùng thư mục
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';

$app->handleRequest(Request::capture());
