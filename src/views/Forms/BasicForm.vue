<template>
    <div>
        <a-form :layout="formLayout" :form="form">
            <a-form-item
                label="Form Layout"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
            >
                <a-radio-group default-value="horizontal" @change="handleFormLayoutChange">
                    <a-radio-button value="horizontal">Horizontal</a-radio-button>
                    <a-radio-button value="vertical">Vertical</a-radio-button>
                    <a-radio-button value="inline">Inline</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item
                label="Field A"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                :validate-status="fildAstatus"
                :help="fildAhelp"
            >
                <a-input
                    placeholder="input placeholder"
                    v-decorator="['fieldA',{ initialValue: fieldA, rules: [{require: true, min: 6, message: '不能少于6个字符'}]}]"
                />
            </a-form-item>
            <a-form-item
                label="Field B"
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
            >
                <a-input placeholder="input placeholder" v-decorator="['fieldB']" />
            </a-form-item>
            <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
                <a-button type="primary" @click="handleSubmit">Submit</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
export default {
    data() {
        this.form = this.$form.createForm(this);
        return {
            formLayout: "horizontal",
            fildAstatus: "",
            fildAhelp: "",
            fieldA: "hello",
            fieldB: ""
        };
    },
    computed: {
        formItemLayout() {
            const { formLayout } = this;
            return formLayout === "horizontal"
                ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
                : {};
        },
        buttonItemLayout() {
            const { formLayout } = this;
            return formLayout === "horizontal"
                ? { wrapperCol: { span: 14, offset: 4 } }
                : {};
        }
    },
    methods: {
        handleFormLayoutChange(e) {
            this.formLayout = e.target.value;
        },
        handleSubmit() {
            this.form.validateFields((err, value) => {
                if (!err) {
                    console.log(value);
                }
            });
            // if (this.fileA.length <= 5) {
            //     this.fildAstatus = "error";
            //     this.fildAhelp = "不能少于6个字符";
            // } else {
            //     console.log({
            //         fieldA: this.fieldA,
            //         fieldB: this.fieldB
            //     });
            // }
        }
    }
};
</script>