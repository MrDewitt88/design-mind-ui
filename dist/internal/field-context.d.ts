export declare const FIELD_CTX_KEY: unique symbol;
export interface FieldContext {
    readonly controlId: string;
    readonly describedBy: string | undefined;
    readonly invalid: boolean;
    readonly required: boolean;
}
export declare function setFieldContext(ctx: FieldContext): void;
export declare function useFieldContext(): FieldContext | undefined;
//# sourceMappingURL=field-context.d.ts.map