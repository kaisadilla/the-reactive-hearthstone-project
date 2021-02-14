class MousePos {
    static x = 0;
    static y = 0;
    
    static trackMousePos () {
        window.addEventListener("mousemove", evt => {
            if (evt.clientX) MousePos.x = evt.clientX;
            if (evt.clientY) MousePos.y = evt.clientY;
        });
    }
}

export default MousePos;