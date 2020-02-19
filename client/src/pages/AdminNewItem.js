import React, {useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import * as M from 'materialize-css'
import axios from 'axios'
import Card from "../components/Card";
import Image from "../components/Image";
import IconBlc from "../components/IconBlc";


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
        let url = `/upload`;
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
        axios.post('/uploadArchive', fd)
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

    const imageSrc = form.imgs.length < 1 ? `./images/nope.jpg` : form.imgs[0]
    const handleSubmit = async event => {

        try {
            const data = await request('/api/item/add', 'POST', {...form});

            message(data.message);
        } catch (e) {
        }

    }

    return (
            <div className="row mt">
                <div className="col 8">
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
                            <label htmlFor="likes">Лайки</label>
                            <input onChange={handleChange} type="number" name="likes" required id="likes"
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
                            <input type="file" onChange={fileSelectedHandler}  />
                        </div>
                        <button
                            className="btn blue-grey darken-2 white-text mr"
                            onClick={handleSubmit}
                            disabled={loading}
                        >Загрузить
                        </button>
                    </div>
                </div>
                <div className="col 4">
                        <div className="card hoverable">
                            <div className="card-image waves-effect waves-block waves-light">
                                <Image src={imageSrc}/>
                            </div>
                            <div className="card-content">
                        <span className="card-title activator grey-text text-darken-4">
                            {form.title}
                            <i className="material-icons right">more_vert</i>
                            <IconBlc likes={form.likes}/>
                        </span>
                                <div className="card_btn_wrapper">
                                    <a className="waves-effect waves-light cyan darken-1 btn mr-1 mt-1">КУПИТЬ</a>

                                    <a href="#"
                                       className="waves-effect waves-light cyan darken-1 btn mr-1 mt-1">Подробнее</a>

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