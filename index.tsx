import * as React from 'react';
import { createRoot } from 'react-dom/client';
import '@arco-design/web-react/dist/css/arco.css';
import { Label } from './view/Label';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(<Label />);
