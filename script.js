const questions = [
    {
        questions: "Which is largist animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        questions: "Which is smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"; //innerHTML:要素内のHTMLを文字列として取得・変更する。HTML取得の場合には、HTMLタグを含む文字列が取得される。
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]; //変数curentQuestionに配列questionsのcurrentQuestionIndex番目に格納された値を代入する
    let questionNo = currentQuestionIndex + 1; // 変数questionNoにcurrentQuestionIndexに１を加えた値を代入する
    questionElement.innerHTML = questionNo + ". " + currentQuestion.questions; //questionElementオブジェクトのinnerHTMLにアクセスして、HTMLタグで囲まれた文字列を変更する
    question;

    currentQuestion.answers.forEach(answer => {  //アロー関数による記述,引数：answer,多階層の配列に注意、forEach:配列の要素に対する繰り返し処理.currentQuestionオブジェクト内のanswers配列に対して forEach メソッドを使用しています。forEachメソッドの引数として、アロー関数が渡されている
        const button = document.createElement("button");　 // 新しい <button> 要素（エレメントはDOMオブジェクト）を作成し、変数 button に代入
        button.innerHTML = answer.text; //ボタン要素のHTML要素を取得して、配列のtextプロパティの値を代入
        button.classList.add("btn");　//ボタン要素にbtnクラスを追加する
        answerButtons.appendChild(button);//answerButtons 要素に、新しく作成した button 要素を子要素として追加します。つまり、各選択肢に対して新しいボタンが answerButton 要素内に追加されます。
        if(answer.correct){ //配列の要素がtrueであるか否か
            button.dataset.correct = answer.correct;　//data-correct = "配列の各要素のcorrectプロパティの値"
        }
        button.addEventListener("click", selectAnswer);
        });
}

function resetState(){
    nextButton.style.display = "none"; //nextButtonオブジェクトのCSSstyleのdisplayプロパティをnoneに変更する
    while(answerButtons.firstChild){ //値はすべて論理値に変換される
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){//関数selectAnswerの引数にEventオブジェクトが渡されている
    const selectedBtn = e.target;//Eventオブジェクトのtargetプロパティは、実際にイベントが発生した要素を返す、すなわち押されたボタンの要素が返される
    const isCorrect = selectedBtn.dataset.correct === "true";//押されたボタンのdata-correct属性が"true"であるか否かを判定し、（等価演算子）真であればtrue,偽であればfalseを返す
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; //buttonオブジェクトのdisabledプロパティをtrueにして、ボタンを無効化する
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scorede ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();
