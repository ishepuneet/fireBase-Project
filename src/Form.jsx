"use client"
import React, { useEffect, useState } from 'react'
import { getDatabase, ref, set, onValue } from "firebase/database";
import { app } from "./Fire"
import { v4 as uuidv4 } from 'uuid';




export default function Form() {

    const db = getDatabase(app);

    let userData = (e) => {
        e.preventDefault()

        let userObj = {
            name: e.target.uname.value,
            mobile: e.target.ucall.value,
            email: e.target.umail.value,
            password: e.target.upass.value,
        }

        let uid = uuidv4();

        set(ref(db, "data-1/" + uid), userObj)
        alert('done')
    }

    let [disdb, setdisdb] = useState([]);

    let displaydb = () => {

        const starCountRef = ref(db, "data-1/");
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();

            let myArr = [];
            for (let newdata in data) {
                let myObj = {
                    db_id: newdata,
                    name: data[newdata].name,
                    mobile: data[newdata].mobile,
                    mail: data[newdata].email,
                    pass: data[newdata].password,

                }
                myArr.push(myObj)
            }
            setdisdb(myArr);
        });
    }

    function writeNewPost(uid, username, picture, title, body) {
        const db = getDatabase();

        // A post entry.
        const postData = {
            author: username,
            uid: uid,
            body: body,
            title: title,
            starCount: 0,
            authorPic: picture
        };

        // Get a key for a new Post.
        const newPostKey = push(child(ref(db), 'posts')).key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/user-posts/' + uid + '/' + newPostKey] = postData;

        return update(ref(db), updates);
    }

    useEffect(() => {
        displaydb()
    }, [])

    return (
        <div class='border-4mx-5 my-2 bg-danger p-4 container '>
            <form onSubmit={userData}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Name</label>
                    <input name='uname' type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Mobile no</label>
                    <input name='ucall' type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input name='umail' type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input name='upass' type="text" class="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

            <table class="table mt-4 ">
                <thead>
                    <tr>
                        <th scope="col">S.no</th>
                        <th scope="col">Name</th>
                        <th scope="col">Mobile no</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Password</th>
                    </tr>
                </thead>
                <tbody>

                    {disdb.length > 0 ?
                        disdb.map((v, i) => {
                            return (
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{v.name}</td>
                                    <td>{v.mobile}</td>
                                    <td>{v.mail}</td>
                                    <td>{v.password}</td>
                                    <th><button></button></th>
                                </tr>
                            )
                        })
                        :
                        ""}
                </tbody>
            </table>
        </div>

    )
}

