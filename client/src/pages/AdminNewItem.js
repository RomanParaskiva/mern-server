import React, {useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {useChips} from "../hooks/chips.hook";
import * as M from "materialize-css";

const AdminNewItem = () =>{
    const message = useMessage();
    const chips = useChips();
    const[form, setForm]  = useState({
        title: '',
        description: '',
        price: 0,
        tags: [],
        imgs: {},
        pathToFile: {},
        likes: 0,
        downloads: 0,
    });
    const { loading,error,request,clearError} = useHttp();
    let tags = [];
    let word = '';


    const handleChange = event => {
        setForm({...form,[event.target.name]: event.target.value});
    }

    const handleChips = event => {
        message(event.keyCode);
        if(event.keyCode === 13) {
            tags.push(word);
            message(tags)
            chips(word);
            word = '';
        } else {
            word += event.key;
        }
    }

    const handleSubmit = event => {
        setForm({'tags':tags});

        alert(JSON.stringify(form));
        event.preventDefault();
    }

    return(
        <div>
            <div className="menu_wrapper">
                <a href="#" data-target="slide-out" className="sidenav-trigger">Меню</a>

            </div>
            <div className="container">
                <div className="admin_form">
                    <div className="input-field col m8 s12">
                        <input onChange={handleChange} id="title" name="title" type="text" className="validate"/>
                        <label htmlFor="title">Имя файла</label>
                    </div>
                    <div className="input-field col m8 s12">
                        <label htmlFor="description">Описание</label>
                        <input onChange={handleChange} type="text" name="description" id="description" className="validate"/>
                    </div>
                    <div className="input-field col m8 s12">
                        <label htmlFor="tags">Тэги</label>
                        <div className="chips"  >

                        <input name="tags" id="tags" className="custom-class" onKeyDown={handleChips}/>
                        </div>
                    </div>
                    <div className="input-field col m8 s12">
                        <label htmlFor="price">Цена</label>
                        <input onChange={handleChange} type="number" name="price" id="price" className="validate"/>
                    </div>
                    <div className="input-field col m8 s12">
                        <div id="drop-area">
                            <p>Перетащите изображения для загрузки на сервер</p>
                            <progress id="progress-bar" max="100" value="0"></progress>

                            <input id="fileElem" type="file" name="photo"  multiple accept="image/*"/>
                            <div id="gallery"></div>
                        </div>
                    </div>
                    <div className="input-field col m8 s12">
                        <input type="file" name="zip" id="zip" accept="application/zip" />
                    </div>
                    <button
                        className="btn blue-grey darken-2 white-text mr"
                        onClick={handleSubmit}
                        disabled={loading}
                    >Загрузить
                    </button>
                </div>
            </div>
        </div>
    )
}

document.addEventListener('DOMContentLoaded',() => {
    let dropArea = document.getElementById('drop-area');
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false)
    });

    let filesDone = 0
    let filesToDo = 0
    let progressBar = document.getElementById('progress-bar')
    function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
    }
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false)
    });
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false)
    });
    function highlight(e) {
        dropArea.classList.add('highlight')
    }
    function unhighlight(e) {
        dropArea.classList.remove('highlight')
    }
    dropArea.addEventListener('drop', handleDrop, false);
    function handleDrop(e) {
        let dt = e.dataTransfer
        let files = dt.files
        handleFiles(files)
    }

    function handleInput(e) {
        let dt = e.dataTransfer
        let files = dt.files
        handleFiles(files)
    }


    function handleFiles(files) {
        files = [...files];
        initializeProgress(files.length); // <- Добавили эту строку
        files.forEach(uploadFile);
        files.forEach(previewFile)
    }
    function uploadFile(file) {
        console.log(file)
        let url = './images';
        let formData = new FormData();
        formData.append('file', file);
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(progressDone)
            .catch((e) => { throw e })
    }
    function previewFile(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            let img = document.createElement('img');
            img.src = reader.result;
            document.getElementById('gallery').appendChild(img)
        }
    }
    function initializeProgress(numfiles) {
        progressBar.value = 0
        filesDone = 0
        filesToDo = numfiles
    }
    function progressDone() {
        filesDone++;
        progressBar.value = filesDone / filesToDo * 100
    }

});

export default AdminNewItem;