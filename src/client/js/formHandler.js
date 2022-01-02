
function onSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    if (Client.checkForName(formText)) {
        fetch("http://localhost:8081/test", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: formText })
        }).then(res => res.json())
            .then(function (res) {
                document.getElementById('score_tag').innerHTML = res.score_tag
                document.getElementById('confidence').innerHTML = res.confidence
                document.getElementById('subjectivity').innerHTML = res.subjectivity
                document.getElementById('agreement').innerHTML = res.agreement
                document.getElementById('resultSection').className = ""
            })
    }
    else {
        alert("invalid url")
        document.getElementById('resultSection').className = "hidden"
    }
}

export { onSubmit }
