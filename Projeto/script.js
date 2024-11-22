document.addEventListener("DOMContentLoaded", () => {
    const addCourseBtn = document.getElementById("addCourseBtn");
    const coursesContainer = document.getElementById("coursesContainer");

    // Adicionar curso
    addCourseBtn.addEventListener("click", () => {
        const courseTitle = prompt("Digite o título do curso:");
        const videoURL = prompt("Cole o link do vídeo (URL):");
        const fileName = prompt("Nome do arquivo para download:");
        const fileURL = prompt("Cole o link do arquivo (URL):");

        if (courseTitle && videoURL && fileName && fileURL) {
            createCourse(courseTitle, videoURL, fileName, fileURL);
        } else {
            alert("Por favor, preencha todas as informações!");
        }
    });

    // Criar área de curso
    function createCourse(title, video, file, fileUrl) {
        const courseDiv = document.createElement("div");
        courseDiv.className = "course";

        courseDiv.innerHTML = `
            <h3>${title}</h3>
            <video controls width="100%">
                <source src="${video}" type="video/mp4">
                Seu navegador não suporta vídeos.
            </video>
            <p><a href="${fileUrl}" download>${file}</a></p>
        `;

        coursesContainer.appendChild(courseDiv);
    }
});
