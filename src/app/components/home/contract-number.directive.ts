import { Directive, ElementRef, EventEmitter, Output, Renderer } from '@angular/core';
import { NgModel } from '@angular/forms';

@Directive({
    selector: '[ngModel][app-contract-number]',
    providers: [NgModel],
    host: {
        "(input)": 'onInputChange($event)',
        '(ngModelChange)': 'onInputChange($event)',
        '(keydown.backspace)': 'onInputChange($event.target.value, true)'
    }
})

/**Директива - маска номера договора*/
export class ContractNumberDirective {
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter();

    map_ru = 'ЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ';
    map_eng = `QWERTYUIOP[]ASDFGHJKL;'ZXCVBNM,.`;

    constructor(public model: NgModel,
        public el: ElementRef,
        public renderer: Renderer) {
    }

    /**Изменение ввода*/
    onInputChange(event: any) {


        if (event && event.target) {

            // Привести всё к верхнему регистру
            let newVal = event.target.value.toUpperCase();

            // Заменить все символы на QWERTY
            for (let i = 0; i < this.map_ru.length; i++) {
                const regex = new RegExp(this.map_ru[i], 'g');
                newVal = newVal.replace(regex, this.map_eng[i]);
            }

            // Оставить только буквы и цифры
            newVal = newVal.replace(new RegExp('[^a-zA-Z0-9 ]', 'g'), '');
            /**Ограничение на длину номера*/
            if (newVal.length > 14) {
                newVal = newVal.substring(0, 14);
            }

            // Добавляем разделители
            if (newVal.length === 0) {
                newVal = '';
            } else if (newVal.length <= 3) {
                newVal = newVal.replace(new RegExp('[^A-Z ]', 'g'), '');
            } else if (newVal.length <= 12) {
                newVal = newVal.substring(0, 3) + '-' + newVal.substring(3, newVal.length).replace(new RegExp('[^0-9 ]', 'g'), '');
            } else if (newVal.length <= 13) {
                newVal = newVal.substring(0, 3) + '-' + newVal.substring(3, newVal.length-1).replace(new RegExp('[^0-9 ]', 'g'), '') + newVal.substring(12, newVal.length).replace(new RegExp('[^A-Z ]', 'g'), '');
            } else if (newVal.length <= 14) {
                newVal = newVal.substring(0, 3) + '-' + newVal.substring(3, newVal.length-2).replace(new RegExp('[^0-9 ]', 'g'), '') + newVal.substring(12, newVal.length).replace(new RegExp('[^A-Z ]', 'g'), '');
                this.renderer.invokeElementMethod(this.el.nativeElement, 'blur', []);
            }

            this.model.valueAccessor.writeValue(newVal);
            this.ngModelChange.emit(newVal);
        }
    }
}
