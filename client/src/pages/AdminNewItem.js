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
        likes: 0,
        imgs: [],
        pathToFile: ''
    });
    const [archive, setArchive] = useState({
        selectedArchive: null
    })

    let word = '';


    setTimeout(() => {
        const chips = document.querySelectorAll('.chips');
        M.Chips.init(chips);

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
        e.preventDefault()
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
        let url = `/api/item/upload`;
        let fd = new FormData();
        fd.append('file', file)
        fd.append('filename', file.name)
       axios.post(url, fd)
           .then(res => {
              form.imgs.push(res.data.file);
           })
    }

    const fileSelectedHandler = event => {
        preventDefaults(event)
        archive.selectedArchive = event.target.files[0]
        let fd = new FormData();
        fd.append('file', archive.selectedArchive)
        fd.append('filename', archive.selectedArchive.name)
        axios.post('/api/item/uploadArchive', fd)
            .then(res => {
                form.pathToFile = (res.data.file);
            })
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
        try {
            const data = await request('/api/item/add', 'POST', {...form});

            message(data.message);
            if (data) window.location = "/";
        } catch (e) {
        }

    }

    return (
            <div className="row mt">
                <div className="col s8 admin_form">
                        <div className="input-field">
                            <input onChange={handleChange} id="title" name="title" type="text" required
                                   className="validate"/>
                            <label htmlFor="title">Имя файла</label>
                        </div>
                        <div className="input-field">
                            <label htmlFor="description">Описание</label>
                            <input onChange={handleChange} type="text" name="description" required id="description"
                                   className="validate"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="tags">Тэги</label>
                            <div className="chips">

                                <input name="tags" id="tags" className="custom-class" required onKeyDown={handleChips}/>
                            </div>
                        </div>
                        <div className="input-field">
                            <label htmlFor="price">Цена</label>
                            <input onChange={handleChange} type="number" name="price" required id="price"
                                   className="validate"/>
                        </div>
                        <div className="input-field">
                            <label htmlFor="likes">Лайки</label>
                            <input onChange={handleChange} type="number" name="likes" required id="likes"
                                   className="validate"/>
                        </div>

                        <div className="input-field">
                            <div id="dropArea">
                                <p>Перетащите изображения для загрузки на сервер</p>

                                <input id="fileElem" type="file" name="photo" multiple accept="image/*"/>

                            </div>
                        </div>
                        <div className="input-field ">
                            <input type="file" onChange={fileSelectedHandler}  />
                        </div>
                        <button
                            className="btn blue-grey darken-2 white-text mr mb"
                            onClick={handleSubmit}
                            disabled={loading}
                        >Загрузить
                        </button>
                </div>
                <div className="col s4">
                        <div className="card hoverable">
                            <div id="gallery" className="card-image waves-effect waves-block waves-light">

                            </div>
                            <div className="card-content">
                                <span className="card-title activator grey-text text-darken-4">
                                    {form.title}
                                    <i className="material-icons right">more_vert</i>
                                </span>
                                <span className="activator grey-text text-darken-4">
                                   $ {form.price}
                                </span>

                                <div className="card_btn_wrapper mt">
                                    <a href="#" className="waves-effect waves-light cyan darken-1 btn mr ">BUY</a>

                                    <a href="#"
                                       className="waves-effect waves-light white black-text btn mr ">More info</a>
                                    <span className="likes_wrapper"><i className="material-icons">favorite_border</i><span>{form.likes}</span></span>
                                </div>
                            </div>
                            <div className="card-reveal">
                        <span className="card-title grey-text text-darken-4">{form.title}<i
                            className="material-icons right">close</i></span>
                                <p className="card-description">{form.description}</p>
                            </div>
                        </div>
                </div>
            </div>
    )
}

export default AdminNewItem;