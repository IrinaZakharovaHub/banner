export const animations = `
.fade-in {
    opacity: 0;
    animation: 2s fadeIn forwards;
}
@keyframes fadeIn {
    0% {
        opacity: 0
    }
    100% {
        opacity: 1;
    }
}

.to-top {
    animation: 2s toTop forwards;
}

@keyframes toTop {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-30px);
    }
}
`