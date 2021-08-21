//https://teachablemachine.withgoogle.com/models/r4_IcNXFW/
predict1=""
predict2=""
Webcam.set({
    width:350,
    hieght: 350,
    image_format: 'png',
    png_quality:90
});

Webcam.attach("#camera");

function takeSnap(){
Webcam.snap(function(data_uri){
    document.getElementById("results").innerHTML='<img id="capture_image" src="'+data_uri+'"/>';
});
}
console.log('ml5 version', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/r4_IcNXFW/model.json',model_loaded)

function model_loaded(){
    console.log('model is loaded');
}

function speak(){
    s=window.speechSynthesis;
    speak1="the first prediction is "+predict1;
    speak2="the second prediction is "+predict2;
    utter=new SpeechSynthesisUtterance(speak1+speak2);
    s.speak(utter);
}

function check() {
    img=document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("resultEmo").innerHTML=results[0].label;
        document.getElementById("resultEmo2").innerHTML=results[1].label;
        predict1=results[0].label;
        predict2=results[1].label;
        speak();
        if (results[0].label=="Scared"){
            document.getElementById("emoji1").innerHTML="&#128552;"
        }
        if (results[0].label=="Angry"){
            document.getElementById("emoji1").innerHTML="&#128545;"
        }
        if (results[0].label=="Sad"){
            document.getElementById("emoji1").innerHTML="&#128577;"
        }
        if (results[0].label=="Happy"){
            document.getElementById("emoji1").innerHTML="&#128516"
        }
        if (results[0].label=="Neutral"){
            document.getElementById("emoji1").innerHTML="&#128528"
        }
        if (results[1].label=="Scared"){
            document.getElementById("emoji2").innerHTML="&#128552;"
        }
        if (results[1].label=="Angry"){
            document.getElementById("emoji2").innerHTML="&#128545;"
        }
        if (results[1].label=="Sad"){
            document.getElementById("emoji2").innerHTML="&#128577;"
        }
        if (results[1].label=="Happy"){
            document.getElementById("emoji2").innerHTML="&#128516"
        }
        if (results[1].label=="Neutral"){
            document.getElementById("emoji2").innerHTML="&#128528"
        }
    }
}