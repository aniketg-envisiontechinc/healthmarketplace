#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p public/images

# Download hero image
curl -o public/images/hero-fitness.jpg "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop"

# Download health tips images
curl -o public/images/tip-1.jpg "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop"
curl -o public/images/tip-2.jpg "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=200&h=200&fit=crop"
curl -o public/images/tip-3.jpg "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=200&h=200&fit=crop"

# Download daily goals image
curl -o public/images/daily-goals.jpg "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=200&fit=crop"

# Download article images
curl -o public/images/article-1.jpg "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop"
curl -o public/images/article-2.jpg "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop"
curl -o public/images/article-3.jpg "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=400&h=300&fit=crop"

# Download recent activity image
curl -o public/images/recent-activity.jpg "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=200&fit=crop"

# Download challenges image
curl -o public/images/challenges.jpg "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=200&fit=crop"

# Download onboarding images
curl -o public/images/onboarding-1.jpg "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=300&fit=crop"
curl -o public/images/onboarding-2.jpg "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=300&fit=crop"
curl -o public/images/onboarding-3.jpg "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=600&h=300&fit=crop"
curl -o public/images/onboarding-4.jpg "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop"
curl -o public/images/onboarding-5.jpg "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&h=300&fit=crop"

# Download marketplace images
curl -o public/images/food-1.jpg "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=300&fit=crop"
curl -o public/images/food-2.jpg "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop"
curl -o public/images/dietician-1.jpg "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop"
curl -o public/images/dietician-2.jpg "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop" 