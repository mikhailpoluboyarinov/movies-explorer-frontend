export default function Notification ({ messageText, active, type }) {
    return (
        <div className={`notification ${active ? 'notification_active' : ''} notification_${type}`}>
            <span className='notification__text'>{messageText}</span>
        </div>
    );
}