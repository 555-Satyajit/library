 // Hero text content for each page
        const heroContent = [
            {
                title: "Welcome to Harekrushna Mahatab Library",
                description: "Discover thousands of books, digital resources, and knowledge that inspire minds and transform lives. Your journey to learning starts here.",
                cta: "Explore Collection"
            },
            {
                title: "Digital Library Services",
                description: "Access our extensive digital collection from anywhere. E-books, journals, and multimedia resources available 24/7 for all members.",
                cta: "Get Started"
            },
            {
                title: "Community Learning Hub",
                description: "Join workshops, reading clubs, and events. Connect with fellow readers and expand your horizons in our vibrant community space.",
                cta: "View Events"
            },
            {
                title: "Research & Resources",
                description: "Access comprehensive research materials, academic journals, and expert guidance for your scholarly pursuits and professional development.",
                cta: "Start Research"
            }
        ];

        // Update hero text with smooth slide animation
        function updateHeroText(pageIndex) {
            const content = heroContent[pageIndex - 1];
            const heroSection = $('#heroText');
            
            // Add changing class for fade-out animation
            heroSection.addClass('changing');
            
            setTimeout(() => {
                // Update content
                $('#heroTitle').text(content.title);
                $('#heroDescription').text(content.description);
                $('#heroCta').text(content.cta);
                
                // Remove changing class for fade-in animation
                heroSection.removeClass('changing');
            }, 400);
        }

        $(document).ready(function() {
            // Initialize turn.js with single page display
            $("#flipbook").turn({
                width: 800,
                height: 500,
                autoCenter: false,  // Don't auto-center - keep book in place
                display: 'single',  // Show single page at a time
                acceleration: true,
                elevation: 50,
                gradients: true,
                duration: 1200,
                pages: 4,
                when: {
                    turning: function(event, page, view) {
                        updatePageCounter(page);
                        updateButtons(page);
                        updateHeroText(page);
                    }
                }
            });

            // Update page counter
            function updatePageCounter(page) {
                // Page counter removed
            }

            // Update button states
            function updateButtons(page) {
                const totalPages = $("#flipbook").turn("pages");
                
                if (page === 1) {
                    $('#prevBtn').prop('disabled', true);
                } else {
                    $('#prevBtn').prop('disabled', false);
                }

                if (page === totalPages) {
                    $('#nextBtn').prop('disabled', true);
                } else {
                    $('#nextBtn').prop('disabled', false);
                }
            }

            // Control buttons
            $('#prevBtn').click(function() {
                $("#flipbook").turn("previous");
            });

            $('#nextBtn').click(function() {
                $("#flipbook").turn("next");
            });

            // Keyboard navigation
            $(window).bind('keydown', function(e) {
                if (e.keyCode == 37) {
                    $("#flipbook").turn("previous");
                } else if (e.keyCode == 39) {
                    $("#flipbook").turn("next");
                }
            });

            // Auto-play
            let autoPlay = setInterval(function() {
                const currentPage = $("#flipbook").turn("page");
                const totalPages = $("#flipbook").turn("pages");
                
                if (currentPage < totalPages) {
                    $("#flipbook").turn("next");
                } else {
                    $("#flipbook").turn("page", 1);
                }
            }, 3000);

            // Pause autoplay on hover
            $('.hero-section').hover(
                function() {
                    clearInterval(autoPlay);
                },
                function() {
                    autoPlay = setInterval(function() {
                        const currentPage = $("#flipbook").turn("page");
                        const totalPages = $("#flipbook").turn("pages");
                        
                        if (currentPage < totalPages) {
                            $("#flipbook").turn("next");
                        } else {
                            $("#flipbook").turn("page", 1);
                        }
                    }, 5000);
                }
            );

            // Initialize buttons
            updateButtons(1);

            // Responsive adjustments
            function resizeBook() {
                const width = $(window).width();
                let bookWidth, bookHeight;

                if (width > 1400) {
                    bookWidth = 800;
                    bookHeight = 500;
                } else if (width > 1200) {
                    bookWidth = 700;
                    bookHeight = 440;
                } else if (width > 1024) {
                    bookWidth = 600;
                    bookHeight = 380;
                } else if (width > 768) {
                    bookWidth = 700;
                    bookHeight = 440;
                } else if (width > 600) {
                    bookWidth = 500;
                    bookHeight = 320;
                } else {
                    bookWidth = 400;
                    bookHeight = 260;
                }

                $("#flipbook").turn("size", bookWidth, bookHeight);
            }

            $(window).resize(resizeBook);
            resizeBook();
        });