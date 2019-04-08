import React from 'react';
import { 
    defaultErrorMessage
} from '../helpers/general';

export const Alert = ({ error }) => (
    <div className="toast" 
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
        data-autohide="false"
        style={{ position: "absolute", top: 0, right: 0 }}
    >
        <div className="toast-header">
            <img src="..." className="rounded mr-2" alt="..." />
            <strong className="mr-auto">Error</strong>
            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="toast-body">
            {defaultErrorMessage}
        </div>
    </div>
);