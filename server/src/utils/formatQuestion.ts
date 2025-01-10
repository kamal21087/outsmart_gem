const formatQuestion = (question: String) => {
    return {
        "contents": [{
            "parts": [{
                "text": question
            }]
        }]
    };
}

export default formatQuestion;
