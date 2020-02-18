import React, {useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import * as M from 'materialize-css'
import axios from 'axios'


const AdminNewItem = () => {
    const {loading, request} = useHttp();
    const message = useMessage();
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: 0,
        tags: [],
        imgs: [],
        pathToFile: {}
    });

    let word = '';


    setTimeout(() => {
        const chips = document.querySelectorAll('.chips');
        const Chips = M.Chips.init(chips);

        const dropArea = document.getElementById('dropArea');

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

    }, 10);





    function handleDrop(e) {
        let dt = e.dataTransfer
        let files = dt.files
        handleFiles(files)
    }

    function handleFiles(files) {
        files = [...files];
        files.forEach(uploadFile);
        files.forEach(previewFile)
    }


    function preventDefaults(e) {
        e.preventDefault()
        e.stopPropagation()
    }

    const previewFile = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            let img = document.createElement('img');
            img.src = reader.result;
            document.getElementById('gallery').appendChild(img)
        }
    }

    const uploadFile = file => {
        let url = `/upload`;
        console.log(file)
        let fd = new FormData();
        fd.append('file', file)
        fd.append('filename', file.name)
       axios.post(url, fd)
           .then(res => {
              form.imgs.push(res.data.file);
           })
    }

    const uploadZip = e => {
        let dt = e.dataTransfer

        console.log(dt)

    }

    const handleChange = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const handleChips = event => {
        message(event.keyCode);
        if (event.keyCode === 13) {
            if (word.length > 0) {
                form.tags.push(word);
                message(form.tags)
                word = '';
            }
        } else {
            word += event.key;
        }
        const closeIcons = document.querySelectorAll('.close');
        if (closeIcons) {
            closeIcons.forEach(icon => icon.addEventListener('click', () => {
                for (let i = 0; i <= form.tags.length; i++) {
                    if (form.tags[i] === icon.previousSibling.data) {
                        form.tags.splice(i, 1)
                    }
                }

            }, false))
        }
    }


    const handleSubmit = async event => {

        event.preventDefault();
        try {
            const data = await request('/api/item/add', 'POST', {...form});
            message(data.message);
            alert(JSON.stringify({...form}));
        } catch (e) {
        }

    }

    return (
        <div>
            <div className="container mt">
                <div className="admin_form">
                    <div className="input-field col m8 s12">
                        <input onChange={handleChange} id="title" name="title" type="text" required
                               className="validate"/>
                        <label htmlFor="title">Имя файла</label>
                    </div>
                    <div className="input-field col m8 s12">
                        <label htmlFor="description">Описание</label>
                        <input onChange={handleChange} type="text" name="description" required id="description"
                               className="validate"/>
                    </div>
                    <div className="input-field col m8 s12">
                        <label htmlFor="tags">Тэги</label>
                        <div className="chips">

                            <input name="tags" id="tags" className="custom-class" required onKeyDown={handleChips}/>
                        </div>
                    </div>
                    <div className="input-field col m8 s12">
                        <label htmlFor="price">Цена</label>
                        <input onChange={handleChange} type="number" name="price" required id="price"
                               className="validate"/>
                    </div>

                    <div className="input-field col m8 s12">
                        <div id="dropArea">
                            <p>Перетащите изображения для загрузки на сервер</p>

                            <input id="fileElem" type="file" name="photo" multiple accept="image/*"/>
                            <div id="gallery"></div>
                        </div>
                    </div>
                    <div className="input-field col m8 s12">
                        <input type="file" name="zip" id="zip" onChange={uploadZip}  accept="application/zip"/>
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