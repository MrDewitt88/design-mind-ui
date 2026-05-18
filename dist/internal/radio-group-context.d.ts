export declare const RADIO_GROUP_CTX_KEY: unique symbol;
export interface RadioGroupContext {
    readonly name: string;
    readonly value: string | undefined;
    readonly disabled: boolean;
    readonly invalid: boolean;
    select(next: string): void;
}
export declare function setRadioGroupContext(ctx: RadioGroupContext): void;
export declare function useRadioGroupContext(): RadioGroupContext | undefined;
//# sourceMappingURL=radio-group-context.d.ts.map