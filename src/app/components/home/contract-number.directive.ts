import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
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
        public el: ElementRef) {
    }

    /**Изменение ввода*/
    onInputChange(event: any) {


        if (event && event.target) {
            // Текущая позиция курсора
            let start = this.el.nativeElement.selectionStart;
            let end = this.el.nativeElement.selectionEnd;

            // Количество символов до курсора
            let quDigitBefore = 0;
            if (event.target.value.substring(0, start)) {
                quDigitBefore = event.target.value.substring(0, start).length;
            }

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
            if (newVal.length > 15) {
                newVal = newVal.substring(0, 15);
            }

            // Добавляем разделители
            if (newVal.length === 0) {
                newVal = '';
            } else if (newVal.length <= 3) {
                newVal = newVal.replace(/^\d/, '');
            } else if (newVal.length <= 12) {
                console.log(newVal);
                newVal = newVal.substring(0, 3) + '-' + newVal.substring(4, newVal.length - 4).replace(/^\D/, '');
            } else if (newVal.length <= 15) {
                newVal = newVal.replace(/^([A-Z]{3})([0-9]{9})([A-Z]{2})/, '$1-$2$3');
            }
/*
            let newPos = 0;
            // Находим позицию в поформатированной строке
            for (let char of newVal.split('')) {
                // Если цифра то минисуем
                if (!isNaN(parseInt(char, 10))) {
                    // Is a number
                    quDigitBefore--;
                }
                if (quDigitBefore < 0) {
                    break;
                }
                newPos++;
            }

            // Сдвинуть курсор на добавленные/удаленные разделители
            start = newPos;
            end = newPos;
            }
/**/
            this.model.valueAccessor.writeValue(newVal);
            this.ngModelChange.emit(newVal);

            // Установить позицию курсора
            // this.el.nativeElement.setSelectionRange(start, end);
        }
    }
}
