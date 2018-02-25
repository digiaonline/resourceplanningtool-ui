import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';

const plugins = {dvr: validatorjs};

const fields = [];

const hooks = {
  onSuccess(form) {
    console.log('Form Values!', form.values());
  },
  onError(form) {
    console.log('All form errors', form.errors());
  },
};

export default new MobxReactForm({fields}, {plugins, hooks});
