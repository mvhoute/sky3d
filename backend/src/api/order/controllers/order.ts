/**
 * order controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::order.order', ({ strapi }) => ({
  // Custom create method that handles file upload
  async create(ctx) {
    // Check if this is a multipart request (has file)
    if (ctx.is('multipart')) {
      const { data, files } = ctx.request.body;

      // Parse the data JSON string
      const orderData = typeof data === 'string' ? JSON.parse(data) : data;

      // First, upload the file if present
      // Strapi can put files in different places depending on the parser
      let uploadedFileId = null;
      const fileToUpload =
        ctx.request.files?.uploadedFile ||
        ctx.request.files?.['files.uploadedFile'] ||
        files?.uploadedFile ||
        files?.['files.uploadedFile'];

      if (fileToUpload) {
        const uploadService = strapi.plugin('upload').service('upload');
        const uploadedFiles = await uploadService.upload({
          data: {},
          files: fileToUpload,
        });
        if (uploadedFiles && uploadedFiles.length > 0) {
          uploadedFileId = uploadedFiles[0].id;
        }
      }

      // Build the order data with required fields
      const createData = {
        customerName: orderData.customerName as string,
        customerEmail: orderData.customerEmail as string,
        customerPhone: orderData.customerPhone as string | undefined,
        customerMessage: orderData.customerMessage as string | undefined,
        customerStatus: 'new' as const,
        product: orderData.product as string | undefined,
        uploadedFile: uploadedFileId,
      };

      // Create the order
      const order = await strapi.documents('api::order.order').create({
        data: createData,
        status: 'published',
      });


      // Return the created order
      return { data: order };
    }

    // No file, use default create behavior
    return super.create(ctx);
  },
}));
