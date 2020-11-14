<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container modal-container-xs">
          <div>
            <slot name="header">
              <h5>{{ t('Select chart layout') }}</h5>
            </slot>
            <slot name="body">
              <div class="row">
                <div class="card col-md-6">
                    <div class="card-body">
                        <h5 class="card-title">View cases per day</h5>
                        <p class="card-text"></p>
                        <a href="#" class="btn btn-primary" @click="change(1)">Not Cumulative</a>
                        <a href="#" class="btn btn-primary" @click="change(2)">Not Cumulative<small>(per million)</small></a>
                        <a href="#" class="btn btn-primary" @click="change(3)">Cumulative</a>
                        <a href="#" class="btn btn-primary" @click="change(4)">Cumulative<small>(per million)</small></a>
                    </div>
                </div>
                <div class="card col-md-6">
                    <div class="card-body">
                        <h5 class="card-title">View deaths per day</h5>
                        <p class="card-text"></p>
                        <a href="#" class="btn btn-primary" @click="change(5)">Not Cumulative</a>
                        <a href="#" class="btn btn-primary" @click="change(6)">Not Cumulative<small>(per million)</small></a>
                        <a href="#" class="btn btn-primary" @click="change(7)">Cumulative</a>
                        <a href="#" class="btn btn-primary" @click="change(8)">Cumulative<small>(per million)</small></a>
                    </div>
                </div>
              </div>
            </slot>
            <slot name="footer">
              <a href="#" ref="cancel" class="btn btn-light" @click="closeModal()">Cancel</a>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalChartsType',
  props: {
    modalChartsType: Boolean,
    selectedChart: Number
  },
  mounted: function() {
    document.addEventListener('keydown', e => {
      if (e.keyCode === 27) {
        this.$emit('update:modalChartsType', null);
      }
    })
  },
  methods: {
    change: function(selectedChart) {
      this.$emit('update:selectedChart', selectedChart);
      this.$emit('update:update', true);
      this.closeModal()
    },
    closeModal: function() {
      this.$emit('update:modalChartsType', null);
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
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.modal-container-xs {
  width: 700px
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

h5.card-title > small {
    display: block;
    font-size: 12px;
}
.card-body > .btn {
    margin: 10px 0 0 0;
    display: block;
}
.card-body > .btn > small {
    display: block;
}
</style>