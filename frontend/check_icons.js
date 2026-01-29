import * as fa from 'react-icons/fa';
const icons = Object.keys(fa);
const required = ['FaSave', 'FaPlus', 'FaTrash2', 'FaFilePdf', 'FaArrowLeft', 'FaHeartbeat', 'FaCapsules', 'FaClipboard', 'FaExclamationTriangle', 'FaSpinner', 'FaCheckCircle'];

const missing = required.filter(i => !icons.includes(i));
console.log('Missing icons:', missing);
console.log('Total icons:', icons.length);
