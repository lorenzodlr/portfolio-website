import './Contact.css'
import Copy from '../copy-outline.svg'

const Contact = props => {

    const apiUrl = 'https://lorenzo-api.herokuapp.com'

    const copyToClipboard = () => {
        const email = document.querySelector('.contact').querySelector('.email')
        const success = document.querySelector('.contact').querySelector('.clipboard-success')

        navigator.clipboard.writeText(email.innerHTML)
        success.classList.add('slideFromTop')
        setTimeout(() => success.classList.remove('slideFromTop'), 5001)
    }
    const handleFormSubmit = () => {
        const masterNode = document.querySelector('.contact').querySelector('form')
        const email = masterNode.querySelectorAll('input')[0].value
        const subject = masterNode.querySelectorAll('input')[1].value
        const message = masterNode.querySelector('textarea').value
        const error = masterNode.querySelector('.error')
        const error2 = masterNode.querySelector('.error-2')
        const success = masterNode.querySelector('.success')

        if ( !email || !subject || !message ) {
            error.style.display = 'block'
            setTimeout(() => error.style.display = 'none', 5000)
        } else {
            fetch(`${apiUrl}/client/client-inquiry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    sender: email,
                    subject: subject,
                    body: message
                })
            })
                .then( () => {
                    success.style.display = 'block'
                    masterNode.reset()
                    setTimeout(() => success.style.display = 'none', 5000)
                })
                .catch( () => {
                    error2.style.display = 'block'
                    setTimeout(() => error2.style.display = 'none', 5000)
                })
        }
    }

    return (
        <div className='contact'>
            <h1>Contact</h1>
            <h5>You can reach me through my professional email or you can send me a message with the form below.</h5>
            <div className='email-container'>
                <p>My email is</p>
                <p className='email'>lorenzodlr@lorenzodesign.io</p>
                <img
                    src={Copy}
                    className='copy-icon'
                    onClick={() => copyToClipboard()}
                />
                <p className='clipboard-success'>copied to clipboard!</p>
            </div>
            <form onSubmit={e => e.preventDefault()}>
                <h6>Your email</h6>
                <input type='text' />
                <h6>Subject</h6>
                <input type='text' />
                <h6>Message</h6>
                <textarea></textarea>
                <p>*all fields are required</p>
                <button onClick={() => handleFormSubmit()}>send</button>
                <p className='error'>please make sure there are no empty fields</p>
                <p className='error-2'>There was an error sending your message. Please try again.</p>
                <p className='success'>message sent!</p>
            </form>
        </div>
    )
}

export default Contact