<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check for GD library
if (!extension_loaded('gd')) {
    die("PHP GD library is not installed\n");
}

// Set image dimensions
$width = 800;
$height = 400;
$avatar_size = 200;

echo "Starting image generation...\n";

$courses = [
    'python-bg' => [
        'light' => ['#4B79A1', '#283E51'],
        'dark' => ['#243B50', '#142130']
    ],
    'js-bg' => [
        'light' => ['#F7971E', '#FFD200'],
        'dark' => ['#B87016', '#BF9E00']
    ],
    'html-css-bg' => [
        'light' => ['#834D9B', '#D04ED6'],
        'dark' => ['#5F377F', '#A03EA6']
    ],
    'java-bg' => [
        'light' => ['#1D976C', '#93F9B9'],
        'dark' => ['#165B41', '#6FBB8C']
    ],
    'webdev-bg' => [
        'light' => ['#2193b0', '#6dd5ed'],
        'dark' => ['#1A6F85', '#51A0B2']
    ],
    'python-data-bg' => [
        'light' => ['#CC2B5E', '#753A88'],
        'dark' => ['#991F46', '#582B66']
    ],
    'js-frameworks-bg' => [
        'light' => ['#904e95', '#e96443'],
        'dark' => ['#6C3A70', '#B04B32']
    ],
    'spanish-bg' => [
        'light' => ['#11998e', '#38ef7d'],
        'dark' => ['#0D726A', '#2AB35E']
    ],
    'french-bg' => [
        'light' => ['#2E3192', '#1BFFFF'],
        'dark' => ['#23256E', '#14BFBF']
    ],
    'java-enterprise-bg' => [
        'light' => ['#0F2027', '#2C5364'],
        'dark' => ['#0A1418', '#1F3A45']
    ],
    'css-animation-bg' => [
        'light' => ['#FF0099', '#493240'],
        'dark' => ['#BF0073', '#362530']
    ],
    'python-web-bg' => [
        'light' => ['#4776E6', '#8E54E9'],
        'dark' => ['#3559AD', '#6B3FB0']
    ],
    'german-bg' => [
        'light' => ['#FF512F', '#DD2476'],
        'dark' => ['#BF3C23', '#A61B58']
    ],
    'responsive-bg' => [
        'light' => ['#16BFFD', '#CB3066'],
        'dark' => ['#118FBE', '#98244D']
    ]
];

// Create images directory if it doesn't exist
$imageDir = __DIR__ . '/images';
if (!file_exists($imageDir)) {
    if (!mkdir($imageDir, 0777, true)) {
        die("Failed to create images directory at: $imageDir\n");
    }
    echo "Created images directory\n";
}

// Test image creation
try {
    $testImage = imagecreatetruecolor(100, 100);
    if (!$testImage) {
        die("Failed to create test image\n");
    }
    imagedestroy($testImage);
    echo "Image creation test successful\n";
} catch (Exception $e) {
    die("Error during image creation test: " . $e->getMessage() . "\n");
}

// Generate course backgrounds for both themes
foreach ($courses as $name => $themes) {
    echo "Processing $name...\n";
    foreach (['light', 'dark'] as $theme) {
        try {
            // Create new image
            $image = imagecreatetruecolor($width, $height);
            if (!$image) {
                echo "Failed to create image for $name-$theme\n";
                continue;
            }
            
            // Enable alpha channel
            imagealphablending($image, false);
            imagesavealpha($image, true);
            
            // Create gradient
            $steps = $height;
            
            // Convert hex to RGB
            $color1 = sscanf($themes[$theme][0], "#%02x%02x%02x");
            $color2 = sscanf($themes[$theme][1], "#%02x%02x%02x");
            
            // Create gradient
            for ($i = 0; $i < $steps; $i++) {
                $r = $color1[0] + ($color2[0] - $color1[0]) * ($i / $steps);
                $g = $color1[1] + ($color2[1] - $color1[1]) * ($i / $steps);
                $b = $color1[2] + ($color2[2] - $color1[2]) * ($i / $steps);
                
                $color = imagecolorallocate($image, $r, $g, $b);
                imagefilledrectangle($image, 0, $i, $width, $i, $color);
            }
            
            // Add pattern overlay
            for ($i = 0; $i < 1000; $i++) {
                $x = rand(0, $width);
                $y = rand(0, $height);
                $opacity = rand(90, 110);
                $color = imagecolorallocatealpha($image, 255, 255, 255, $opacity);
                imagesetpixel($image, $x, $y, $color);
            }
            
            // Add subtle geometric shapes
            $shapes = rand(3, 6);
            for ($i = 0; $i < $shapes; $i++) {
                $shape_width = rand($width/8, $width/4);
                $shape_height = rand($height/8, $height/4);
                $x = rand(0, $width - $shape_width);
                $y = rand(0, $height - $shape_height);
                
                $shapeColor = imagecolorallocatealpha($image, $color1[0], $color1[1], $color1[2], 110);
                
                switch(rand(0, 2)) {
                    case 0:
                        imagefilledellipse($image, $x + $shape_width/2, $y + $shape_height/2, 
                                         $shape_width, $shape_height, $shapeColor);
                        break;
                    case 1:
                        imagefilledrectangle($image, $x, $y, 
                                           $x + $shape_width, $y + $shape_height, $shapeColor);
                        break;
                    case 2:
                        $points = [
                            $x, $y + $shape_height,
                            $x + $shape_width/2, $y,
                            $x + $shape_width, $y + $shape_height
                        ];
                        imagefilledpolygon($image, $points, 3, $shapeColor);
                        break;
                }
            }
            
            // Save image
            $filename = "$imageDir/$name-$theme.png";
            if (imagepng($image, $filename)) {
                echo "Successfully created $filename\n";
            } else {
                echo "Failed to save $filename\n";
            }
            imagedestroy($image);
            
        } catch (Exception $e) {
            echo "Error processing $name-$theme: " . $e->getMessage() . "\n";
        }
    }
}

// Generate testimonial avatars
echo "\nGenerating testimonial avatars...\n";

$testimonials = [
    'testimonial1' => ['#FF6B6B', '#556270'],
    'testimonial2' => ['#4CA1AF', '#2C3E50']
];

foreach ($testimonials as $name => $colors) {
    try {
        echo "Processing $name...\n";
        
        // Create new image
        $image = imagecreatetruecolor($avatar_size, $avatar_size);
        if (!$image) {
            echo "Failed to create image for $name\n";
            continue;
        }
        
        // Enable alpha channel
        imagealphablending($image, false);
        imagesavealpha($image, true);
        
        // Convert hex to RGB
        $color1 = sscanf($colors[0], "#%02x%02x%02x");
        $color2 = sscanf($colors[1], "#%02x%02x%02x");
        
        // Create circular gradient
        $center_x = $avatar_size / 2;
        $center_y = $avatar_size / 2;
        $radius = $avatar_size / 2;
        
        for ($x = 0; $x < $avatar_size; $x++) {
            for ($y = 0; $y < $avatar_size; $y++) {
                $distance = sqrt(pow($x - $center_x, 2) + pow($y - $center_y, 2));
                
                if ($distance < $radius) {
                    $ratio = $distance / $radius;
                    
                    $r = $color1[0] + ($color2[0] - $color1[0]) * $ratio;
                    $g = $color1[1] + ($color2[1] - $color1[1]) * $ratio;
                    $b = $color1[2] + ($color2[2] - $color1[2]) * $ratio;
                    
                    $color = imagecolorallocate($image, $r, $g, $b);
                    imagesetpixel($image, $x, $y, $color);
                } else {
                    $color = imagecolorallocatealpha($image, 0, 0, 0, 127);
                    imagesetpixel($image, $x, $y, $color);
                }
            }
        }
        
        // Add pattern overlay
        $pattern_density = 500;
        for ($i = 0; $i < $pattern_density; $i++) {
            $angle = rand(0, 360) * M_PI / 180;
            $distance = rand(0, $radius);
            
            $x = $center_x + cos($angle) * $distance;
            $y = $center_y + sin($angle) * $distance;
            
            if (sqrt(pow($x - $center_x, 2) + pow($y - $center_y, 2)) < $radius) {
                $opacity = rand(100, 120);
                $color = imagecolorallocatealpha($image, 255, 255, 255, $opacity);
                imagesetpixel($image, $x, $y, $color);
            }
        }
        
        // Save avatar
        $filename = "$imageDir/$name.png";
        if (imagepng($image, $filename)) {
            echo "Successfully created $filename\n";
        } else {
            echo "Failed to save $filename\n";
        }
        imagedestroy($image);
        
    } catch (Exception $e) {
        echo "Error processing $name: " . $e->getMessage() . "\n";
    }
}

echo "\nImage generation process completed!\n";
?>