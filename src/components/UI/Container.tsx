import { type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";

// better polymorphic wrapper
type ContainerProps<T extends ElementType> ={ // make this as generic type base on element type
    as?: T; //use the Generic type T, also make this optional to accept default div value
    children: ReactNode;
} & ComponentPropsWithoutRef<T>; // uses generic type, which means whatever elementType

const Container = <C extends ElementType>({as,children,...props}: ContainerProps<C>) => {
    const Component = as || 'div';
    return <Component {...props}>{children}</Component>
}

export default Container;