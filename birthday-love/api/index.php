<?php
header('Content-Type: application/json; charset=utf-8');

echo json_encode([
    'status' => 'success',
    'message' => 'Birthday surprise is ready.',
    'project' => 'birthday-love',
    'for' => 'My favorite person',
    'type' => 'romantic birthday website'
], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
