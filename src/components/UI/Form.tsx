import { 
    type ComponentPropsWithoutRef, 
    type FormEvent, 
    forwardRef,
    useRef,
    useImperativeHandle

} from "react";

export type FormHandle = {
    clear: () =>void; // function type no parameter and return
};

type FormProps =  ComponentPropsWithoutRef<'form'> & {
    onSave: (value: unknown)=>void; //expected type is unknown
}; // & included function props

 const Form = forwardRef<FormHandle, FormProps>(
    function Form ({onSave, children, ...otherProps}, ref){ // dont use arrow function results to error
    // form collects the action    
    const form =  useRef<HTMLFormElement>(null);
    // expose this components interface to other components
    useImperativeHandle(ref, ()=>{ //ref is a parameter
        return {
            clear() {
                console.log('clearing...');
                form.current?.reset(); // ? optional
            },
        }
    });
    // submit form
    const handleSubmit=(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();

        const formData = new FormData(e.currentTarget); // get data from form and stores to object
        const data = Object.fromEntries(formData); // returns info from object to data
        onSave(data);
    }
    return (
        <form onSubmit={handleSubmit} {...otherProps} ref={form}>
            {children}
        </form>
    ); 
       
}
);

export default Form;