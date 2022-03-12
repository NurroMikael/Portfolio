

const renderStars = () => {
    let stars = []

    for (var i = 0; i < 5; i++) {
        stars.push(<span id="star" />)
    }

    return <section id="stars">
        {stars}
    </section>
}

const renderSpecs = () => {
    return [
        "React Js",
        "React Native",
        "LoopBack Mysql",
        "NodeRed",
        "Npm",
        "Aws",
        "Docker",
        "Javascript",
        "Git",
        "JSON",
        "Css",
        "Html",
        "React",
    ]
}

export default {
    renderStars,
    renderSpecs
}

