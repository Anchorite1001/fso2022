import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        );  
    }, [user]);

    useEffect(() => {
        const loggedBlogUserJSON = window.localStorage.getItem('loggedBlogUser');
        if(loggedBlogUserJSON) {
            const user = JSON.parse(loggedBlogUserJSON);
            blogService.setToken(user.token);
            setUser(user);
        }
    },[]);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const user = await loginService.login({username, password});
            blogService.setToken(user.token);
            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
            setUser(user);
            setUsername('');
            setPassword('');
        }
        catch (exception) {
            setErrorMessage('Wrong Credentials');
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        window.localStorage.removeItem('loggedBlogUser');
        setUser(null);
        blogService.setToken('');
    };

    const handleCreateBlog = async (e) => {
        e.preventDefault();

        try {
            const newBlog = await blogService.createOne({title, author, url});
            setBlogs(blogs.concat(newBlog));
            setTitle('');
            setAuthor('');
            setUrl('');
        }
        catch (exception) {
            setErrorMessage('Cannot create new blog');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };

    if (user === null) {
        return (
            <div>
                {errorMessage !== '' && <p>{errorMessage}</p>}
                <h2>Log in to application</h2>
                <form onSubmit={handleLogin}>
                    <div>
                      username
                        <input
                            type="text"
                            value={username}
                            name="Username"
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div>
                      password
                        <input
                            type="password"
                            value={password}
                            name="Password"
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <button type="submit">login</button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <h2>blogs</h2>
            <div>
                <p>{user.username} is logged in</p>
                <button onClick={handleLogout}>logout</button>
            </div>

            <h2>Create New Blog</h2>
            <form onSubmit={handleCreateBlog}>
                <div>
                      title
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                      author
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                      url
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>

            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}
        </div>
    );
};

export default App;
