<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div>
            <slot name="header">
              <h5>{{ t('COVID-19 PANDEMIC') }}</h5>
              <small>{{ t('Select your language') }}</small>
            </slot>
            <slot name="body">
              <button type="button" class="btn btn-light language" @click="change('en')">English</button>
              <button type="button" class="btn btn-light language" @click="change('es')">Español</button>
              <button type="button" class="btn btn-light language" @click="change('pt')">Português</button>
              <button type="button" class="btn btn-light language" @click="change('ru')">Pусский</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalLanguage',
  props: {
    lang: String,
    modal: Boolean,
    update: Boolean
  },
  methods: {
    change: function(lang) {
      this.$emit('update:lang', lang);
      this.$emit('update:modal', null);
      this.$emit('update:update', true);
    }
  },
  locales: {
    en: {
      'COVID-19 PANDEMIC': 'COVID-19 PANDEMIC',
      'Select your language': 'Select your language'
    },
    pt: {
      'COVID-19 PANDEMIC': 'COVID-19 PANDEMIA',
      'Select your language': 'Selecione seu idioma'
    },
    es: {
      'COVID-19 PANDEMIC': 'COVID-19 PANDEMIA',
      'Select your language': 'Elige tu idioma'
    },
    ru: {
      'COVID-19 PANDEMIC': 'COVID-19 ПАНДЕМИЯ',
      'Select your language': 'Выберите свой язык'
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.language {
  display: block !important;
  width: 100%;
  background-color: #d6d6d6 !important;
  margin: 10px 0px !important;
}

.modal-container {
  text-align: center
}

</style>