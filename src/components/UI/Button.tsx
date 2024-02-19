import { type FC, type ComponentPropsWithoutRef } from "react";

// type ButtonProps= {
//     el: 'button';
// }& ComponentPropsWithoutRef<'button'>; //includes other properties of button element

// type AnchorProps = {
//     el: 'anchor';
// } & ComponentPropsWithoutRef<'a'>;
type ButtonProps= ComponentPropsWithoutRef<'button'>; // making it more better polymorphic
type AnchorProps = ComponentPropsWithoutRef<'a'>;

const isAnchorProps = (props:ButtonProps | AnchorProps): props is AnchorProps =>{ // :props is AnchorProps type predicates which return specific boolean type
    return 'href' in props; // return true or false if href exist in props
}

const Button:FC<ButtonProps | AnchorProps> = (props) => {
    //const {el, ...otherProps}=props;
    if (isAnchorProps(props)) {
        return <a className="button" {...props}></a>
    }
    //otherwise
    return (
        <button className="button" {...props}></button>
    )
}

export default Button;