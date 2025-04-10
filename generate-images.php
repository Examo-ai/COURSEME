<?php
// Set image dimensions
$width = 800;
$height = 400;

$courses = [
    'python-bg' => ['#4B79A1', '#283E51'],
    'js-bg' => ['#F7971E', '#FFD200'],
    'html-css-bg' => ['#834D9B', '#D04ED6'],
    'java-bg' => ['#1D976C', '#93F9B9'],
    'webdev-bg' => ['#2193b0', '#6dd5ed'],
    'python-data-bg' => ['#CC2B5E', '#753A88'],
    'js-frameworks-bg' => ['#904e95', '#e96443'],
    'spanish-bg' => ['#11998e', '#38ef7d'],
    'french-bg' => ['#2E3192', '#1BFFFF'],
    'java-enterprise-bg' => ['#0F2027', '#2C5364'],
    'css-animation-bg' => ['#FF0099', '#493240'],
    'python-web-bg' => ['#4776E6', '#8E54E9'],
    'german-bg' => ['#FF512F', '#DD2476'],
    'responsive-bg' => ['#16BFFD', '#CB3066']
];

if (!file_exists('images')) {
    mkdir('images', 0777, true);
}

foreach ($courses as $name => $colors) {
    // Create new image
    $image = imagecreatetruecolor($width, $height);
    
    // Enable alpha channel
    imagealphablending($image, false);
    imagesavealpha($image, true);
    
    // Create gradient
    $steps = $height;
    
    // Convert hex to RGB
    $color1 = sscanf($colors[0], "#%02x%02x%02x");
    $color2 = sscanf($colors[1], "#%02x%02x%02x");
    
    // Create gradient
    for ($i = 0; $i < $steps; $i++) {
        $r = $color1[0] + ($color2[0] - $color1[0]) * ($i / $steps);
        $g = $color1[1] + ($color2[1] - $color1[1]) * ($i / $steps);
        $b = $color1[2] + ($color2[2] - $color1[2]) * ($i / $steps);
        
        $color = imagecolorallocate($image, $r, $g, $b);
        imagefilledrectangle($image, 0, $i, $width, $i, $color);
    }
    
    // Add some noise for texture
    for ($i = 0; $i < 1000; $i++) {
        $x = rand(0, $width);
        $y = rand(0, $height);
        $color = imagecolorallocatealpha($image, 255, 255, 255, 110);
        imagesetpixel($image, $x, $y, $color);
    }
    
    // Save image
    imagepng($image, "images/$name.png");
    imagedestroy($image);
}

echo "Course background images generated successfully!\n";
?>