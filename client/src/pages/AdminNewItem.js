import React, {useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";


const AdminNewItem = () =>{
    const message = useMessage();
    const[form, setForm]  = useState({
        title: '',
        description: '',
        price: 0,
        tags: [],
        imgs: {},
        pathToFile: {}
    });
    const { loading, request} = useHttp();
    let word = '';

    document.addEventListener('DOMContentLoaded',() => {
        const dropArea = document.getElementById('drop-area');

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false)
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false)
        });
        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false)
        });

        dropArea.addEventListener('drop', handleDrop, false);

        function highlight(e) {
            dropArea.classList.add('highlight')
        }

        function unhighlight(e) {
            dropArea.classList.remove('highlight')
        }
        let progressBar = document.getElementById('progress-bar')

        let filesDone = 0
        let filesToDo = 0
        function initializeProgress(numfiles) {
            progressBar.value = 0
            filesDone = 0
            filesToDo = numfiles
        }

        function progressDone() {
            filesDone++;
            progressBar.value = filesDone / filesToDo * 100
        }

        function handleFiles(files) {
            files = [...files];
            initializeProgress(files.length);
            files.forEach(uploadFile);
            files.forEach(previewFile)
        }

        function handleDrop(e) {
            let dt = e.dataTransfer
            let files = dt.files
            handleFiles(files)
        }

        const uploadFile = async file => {

            let url = `/api/item/upload`;
            let formData = new FormData();
            formData.append('file', file);
            formData.delete('Content-Type')

            try {
                const data = await request(url, 'POST', formData)
                progressDone()
                message(data)
            } catch (e) { message(e.message)}



        }

        function preventDefaults(e) {
            e.preventDefault()
            e.stopPropagation()
        }
    })

    function previewFile(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let img = document.createElement('img');
            img.src = reader.result;
            document.getElementById('gallery').appendChild(img)
        }
    }

    const handleChange = event => {
        setForm({...form,[event.target.name]: event.target.value});
    }



    const handleChips = event => {
        message(event.keyCode);
        if(event.keyCode === 13) {
            form.tags.push(word);
            message(form.tags)
            word = '';
        } else {
            word += event.key;
        }
        const closeIcons = document.querySelectorAll('.close');
        if(closeIcons) {
            closeIcons.forEach(icon => icon.addEventListener('click', () => {
                for(let i = 0; i <= form.tags.length; i++){
                    if( form.tags[i] == icon.previousSibling.data){
                        form.tags.splice(i,1)
                    }
                }

            },false))
        }
    }


    const handleSubmit = async event => {

        event.preventDefault();
        try {
            const data = await request('/api/item/add', 'POST', {...form});
            message(data.message);
            setForm({
                title: '',
                description: '',
                price: 0,
                tags: [],
                imgs: {},
                pathToFile: {}
            })
            alert(JSON.stringify({...form}));
        } catch (e) { }

    }

    return(
        <div>
            <div className="menu_wrapper">
                <a href="#" data-target="slide-out" className="sidenav-trigger">Меню</a>

            </div>
            <div className="container">
                <div className="admin_form">
                    <div className="input-field col m8 s12">
                        <input onChange={handleChange} id="title" name="title" type="text" required className="validate"/>
                        <label htmlFor="title">Имя файла</label>
                    </div>
                    <div className="input-field col m8 s12">
                        <label htmlFor="description">Описание</label>
                        <input onChange={handleChange} type="text" name="description" required id="description" className="validate"/>
                    </div>
                    <div className="input-field col m8 s12">
                        <label htmlFor="tags">Тэги</label>
                        <div className="chips"  >

                        <input name="tags" id="tags" className="custom-class" required onKeyDown={handleChips}/>
                        </div>
                    </div>
                    <div className="input-field col m8 s12">
                        <label htmlFor="price">Цена</label>
                        <input onChange={handleChange} type="number" name="price" required id="price" className="validate"/>
                    </div>

                    <div className="input-field col m8 s12">
                        <div id="drop-area">
                            <p>Перетащите изображения для загрузки на сервер</p>
                            <progress id="progress-bar" max="100" value="0"></progress>

                            <input id="fileElem" type="file" name="photo" multiple accept="image/*"/>
                            <div id="gallery"></div>
                        </div>
                    </div>
                    <div className="input-field col m8 s12">
                        <input type="file" name="zip" id="zip" required accept="application/zip" />
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

export default AdminNewItem;