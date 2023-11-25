import React, { ReactNode } from 'react';

// Define the props interface for the Header component
interface paragraphProps{
    children?: ReactNode;
    className?:string,
}

/**
 * Define the Paragraph component function
 * @param paragraphProps Props for the Paragraph component
 */
function Paragraph(paragraphProps:paragraphProps) {
    return ( 
        <p className={paragraphProps.className+" mt-4 mb-4 text-gray-300"}>{paragraphProps.children}</p>
     );
}

export default Paragraph;