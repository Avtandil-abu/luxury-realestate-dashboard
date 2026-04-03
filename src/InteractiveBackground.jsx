import React, { useEffect, useRef } from 'react';

const InteractiveBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        const mouse = { x: null, y: null, radius: 150 };

        // მაუსის მოძრაობის მოსმენა მთელ ფანჯარაზე
        const handleMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const gap = 30;
            for (let y = 0; y < canvas.height; y += gap) {
                for (let x = 0; x < canvas.width; x += gap) {
                    particles.push({ x, y, baseX: x, baseY: y });
                }
            }
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';

            particles.forEach(p => {
                let dx = mouse.x - p.x;
                let dy = mouse.y - p.y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouse.radius) {
                    let force = (mouse.radius - distance) / mouse.radius;
                    let directionX = dx / distance;
                    let directionY = dy / distance;
                    p.x -= directionX * force * 8; // გაფანტვის ძალა
                    p.y -= directionY * force * 8;
                } else {
                    // დაბრუნება თავის ადგილზე
                    p.x -= (p.x - p.baseX) * 0.1;
                    p.y -= (p.y - p.baseY) * 0.1;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1, // ვწევთ წინ, რომ მაუსი დაინახოს
                pointerEvents: 'none', // მნიშვნელოვანია: რომ ღილაკებზე დაჭერა შეძლო!
                backgroundColor: 'transparent'
            }}
        />
    );
};

export default InteractiveBackground;