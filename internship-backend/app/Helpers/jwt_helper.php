<?php

function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64url_decode($data) {
    return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
}

function getJWTFromRequest($authenticationHeader) {
    if (is_null($authenticationHeader) || !preg_match('/Bearer\s(\S+)/', $authenticationHeader, $matches)) {
        throw new Exception('Missing or invalid JWT in request');
    }
    return $matches[1];
}

function validateJWTFromRequest(string $encodedToken) {
    $secret = getenv('JWT_SECRET');
    $parts = explode('.', $encodedToken);
    
    if (count($parts) !== 3) {
        throw new Exception('Invalid token format');
    }
    
    $header = $parts[0];
    $payload = $parts[1];
    $signature = $parts[2];
    
    $validSignature = base64url_encode(hash_hmac('sha256', "$header.$payload", $secret, true));
    
    if (!hash_equals($validSignature, $signature)) {
        throw new Exception('Invalid token signature');
    }
    
    $decodedPayload = json_decode(base64url_decode($payload));
    
    if (isset($decodedPayload->exp) && $decodedPayload->exp < time()) {
        throw new Exception('Token expired');
    }
    
    return $decodedPayload;
}

function getSignedJWTForUser($username) {
    $secret = getenv('JWT_SECRET');
    $issuedAtTime = time();
    $tokenTimeToLive = getenv('JWT_TIME_TO_LIVE');
    $tokenExpiration = $issuedAtTime + ($tokenTimeToLive ? $tokenTimeToLive : 3600);
    
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $payload = json_encode([
        'username' => $username,
        'iat' => $issuedAtTime,
        'exp' => $tokenExpiration,
    ]);
    
    $base64UrlHeader = base64url_encode($header);
    $base64UrlPayload = base64url_encode($payload);
    
    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
    $base64UrlSignature = base64url_encode($signature);
    
    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}
